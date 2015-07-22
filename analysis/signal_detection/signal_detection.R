library('rstan')
library('parallel')


rng_seed <- runif(1)
dat <- readRDS('example_dat.RDS')
stan_dat <- with(dat, list('h' = hit, 'f' = false, 'N' = nrow(dat),
                           'signal' = hit + miss, 'noise' = false + corr))

#compfit <- stan(file = 'signal_model.stan', data = stan_dat, chains = 0)
#saveRDS(compfit, 'compiled_model.RDS')
compfit <- readRDS('compiled_model.RDS')
sflist <- mclapply(1:4, mc.cores = 4,
                   function(i) stan(fit = compfit, data = stan_dat, seed = rng_seed,
                                    chains = 1, chain_id = i, refresh = -1, iter = 2000))
fit <- sflist2stanfit(sflist)
