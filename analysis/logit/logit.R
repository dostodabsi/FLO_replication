library('rstan')
library('parallel')
set.seed(1774)


p <- .7
N <- 400
K <- 25
J <- 50
cond <- c('FL', 'LF') # dummy data
dat <- data.frame(subj = rep(paste0('I', 1:J), each = N / J),
                  item = rep(paste0('A', 1:K), each = N / K),
                  learning = rep(cond, N / 2), y = NA)
dat[dat$learning == 'FL', ]$y <- sample(c(1, 0), N / 2, prob = c(p, 1-p), replace = TRUE)
dat[dat$learning == 'LF', ]$y <- sample(c(1, 0), N / 2, prob = c(1 - p, p), replace = TRUE)

rng_seed <- runif(1)
stan_dat <- with(dat, list(y = y, subj = as.numeric(subj), item = as.numeric(item),
                           cond = ifelse(learning == 'LF', 0, 1),
                           N = N, J = J, K = K))

#compfit <- stan(file = 'logit_model.stan', data = stan_dat, chains = 0)
#saveRDS(compfit, 'compiled_model.RDS')
compfit <- readRDS('compiled_model.RDS')

sflist <- mclapply(1:4, mc.cores = 4,
                   function(i) stan(fit = compfit, data = stan_dat, seed = rng_seed,
                                    chains = 1, chain_id = i, refresh = -1, iter = 4000))

fit <- sflist2stanfit(sflist)
y_hat <- unlist(extract(fit, 'y_hat'), use.names = FALSE)
betas <- extract(fit, 'beta')$beta