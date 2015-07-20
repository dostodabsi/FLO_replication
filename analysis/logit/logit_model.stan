data {
  int<lower=1> N; # number of data points
  int<lower=1> J; # number of participants
  int<lower=1> K; # number of different stimuli
  int<lower=0, upper=1> y[N]; # dependent variable
  int<lower=1, upper=K> item[N]; # random intercept for items
  int<lower=1, upper=J> subj[N]; # random intercept for subjects
  real<lower=-1, upper=1> cond[N];
}

parameters {
  vector[2] beta; # two factorial design
  vector[J] k; # slope adjustments
  vector[J] u; # intercept adjustments for subjects
  vector[K] w; # intercept adjustments for items
  real<lower=0> sigma_e; # variance of the error
  real<lower=0> sigma_w; # variance of the item hyperprior
  real<lower=0> sigma_u; # variance of the subject hyperprior
  real<lower=0> sigma_k; # variance of the varying slope
}

model {
  real p;
  u ~ normal(0, sigma_u);
  w ~ normal(0, sigma_w);
  k ~ normal(0, sigma_k);
  
  for (i in 1:N) {
    p <- (beta[1] + u[subj[i]] + w[item[i]]) + # variying intercept
         (beta[2] + k[subj[i]]) * cond[i]; # varying slope
    y[i] ~ bernoulli_logit(p);
  }
}

generated quantities {
  real p;
  real y_hat[N];
  for (i in 1:N) {
    p <- (beta[1] + u[subj[i]] + w[item[i]]) + # variying intercept
         (beta[2] + k[subj[i]]) * cond[i]; # varying slope
    y_hat[i] <- bernoulli_rng(inv_logit(p));
  }
}