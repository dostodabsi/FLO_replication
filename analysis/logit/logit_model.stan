data {
  int<lower=1> N;                     # number of data points
  int<lower=1> J;                     # number of participants
  int<lower=1> K;                     # number of different stimuli
  int<lower=0, upper=1> y[N];         # dependent variable
  int<lower=1, upper=K> item[N];      # random intercept for items
  int<lower=1, upper=J> subj[N];      # random intercept for subjects
  real<lower=0, upper=1> task[N];     # factor task ('memory', 'discrimination')
  real<lower=0, upper=1> learning[N]; # factor learning ('feature-label', 'label-feature')
}

parameters {
  vector[4] beta;             # two factorial design
  vector[K] w;                # adjustments for items
  matrix[3, J] u;             # adjustments for subjects
  real<lower=0> sigma_e;      # variance of the error
  real<lower=0> sigma_w;      # variance of the item hyperprior
  vector<lower=0>[3] sigma_u; # variance of the subject hyperprior
}

model {
  real p;
  w ~ normal(0, sigma_w);
  
  for (i in 1:3) {
    u[i] ~ normal(0, sigma_u[i]);
  }
  
  for (i in 1:N) {
    p <- (beta[1] + u[1, subj[i]] + w[item[i]]) +  # variying intercept for subj & items
         (beta[2] + u[2, subj[i]]) * task[i] +     # varying slope for task for subj
         (beta[3] + u[3, subj[i]]) * learning[i] + # varying slope for learning for subj
          beta[4] * task[i] * learning[i];         # interaction
    y[i] ~ bernoulli_logit(p);
  }
}

# for posterior predictive checks
generated quantities {
  real p;
  real y_hat[N];
  for (i in 1:N) {
    p <- (beta[1] + u[1, subj[i]] + w[item[i]]) +  # variying intercept for subj & items
         (beta[2] + u[2, subj[i]]) * task[i] +     # varying slope for task for subj
         (beta[3] + u[3, subj[i]]) * learning[i] + # varying slope for learning for subj
          beta[4] * task[i] * learning[i];         # interaction
    y_hat[i] <- bernoulli_rng(inv_logit(p));
  }
}