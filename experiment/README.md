# Feature-Label-Order experiment
Not done yet!

See [here](http://psiturk.org/quick_start/) for a jump start into psiTurk.

## Run the Experiment
Having psiTurk installed, run

```
>> psiturk

[psiturk-dash]: server on
[psiturk-dash]: debug
```

which will open a browser window with the experiment.

## Code Overview
[browserify](http://browserify.org/) is used to modularize the JavaScript. Importantly, browserify allows several transforms.
In this case we can write [ES6](https://github.com/lukehoban/es6features) JavaScript (the next version of JavaScript with many nice features)
which then gets transpiled to ES5 JavaScript by browserify, such that the code is runnable in all current browsers.

## Stimuli
Stimuli are *Fribbles* and taken from [here](http://wiki.cnbc.cmu.edu/Novel_Objects).

## Data
If you run the experiment locally (or remotely, upon changing the database location) you can fetch the data by running
```
python get_data.py
```
