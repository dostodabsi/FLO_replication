#! /usr/bin/env python
import os
import re


# preliminary selection of stimuli
match = r'1111|1112|1113|2111|2112|2113|2211|2212|2213|3311|3312|3321|3313|3322|3323|3331|3332|3333'
for f in os.listdir('.'):
    if re.search(match, f) is not None:
        print(f)
        os.system('convert {0} -resize 650x400 {1}'
                                   .replace('{0}', f)
                                   .replace('{1}', ''.join([f.split('.')[0], '.png'])))

os.system('rm *.pic')
