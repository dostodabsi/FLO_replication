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

## Experiment Overview
Each participant first reads an instruction, and subsequently completes 2 identical training blocks. A block is comprised of
18 exemplars from each of the six alien families (yielding 216 training trials in sum). The exemplars are presented in a
pseudo-random fashion such that no two exemplars from a family pair are presented adjacently.

After these training trials, participants get tested in two ways. First, they are presented with a category verification task in which
they see both an alien and a label. They should answer *old* if it was a pair they have learned, and *new* otherwise. This test
consists of 10 *new* pairs and 10 *old* pairs per category, yielding 120 test trials. A subsequent exemplar recognition task consists of
8 exemplars per family that the participants had seen before, and 8 that they had not. This test amounts to 96 trials.

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
## Todo
Get stimuli pairs, implement both recognition and category verification task.
