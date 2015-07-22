data {
  int<lower=0> N;
  int<lower=0> h[N];
  int<lower=0> f[N];
  int<lower=0> noise[N];
  int<lower=0> signal[N];
}

parameters {
  real mu_d;
  real mu_c;
  vector[N] d;
  vector[N] c;
  real<lower=0> sigma_d;
  real<lower=0> sigma_c;
}

transformed parameters {
  vector<lower=0, upper=1>[N] theta_hit;
  vector<lower=0, upper=1>[N] theta_false;
  for (i in 1:N) {
    theta_hit[i] <- Phi(d[i] / 2 - c[i]);
    theta_false[i] <- Phi(-d[i] / 2 - c[i]);
  }
}

model {
  for (i in 1:N) {
    h[i] ~ binomial(signal[i], theta_hit[i]);
    f[i] ~ binomial(noise[i], theta_false[i]);

    d[i] ~ normal(mu_d, sigma_d);
    c[i] ~ normal(mu_c, sigma_c);
  }
  mu_d ~ normal(0, 5);
  mu_c ~ normal(0, 5);
}