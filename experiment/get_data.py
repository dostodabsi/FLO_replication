from sqlalchemy import create_engine, MetaData, Table
import json
import pandas as pd


rating_header = ['id', 'itemTime', 'language', 'alien', 'learning', 'answer', 'correct']

db_url = 'sqlite:///participants.db'
table_name = 'flo'
data_column_name = 'datastring'

# boilerplace sqlalchemy setup
engine = create_engine(db_url)
metadata = MetaData()
metadata.bind = engine
table = Table(table_name, metadata, autoload=True)

# make a query and loop through
s = table.select()
rows = s.execute()

data = []
#status codes of subjects who completed experiment
statuses = [3,4,5,7]
# if you have workers you wish to exclude, add them here
exclude = []
for row in rows:
    # only use subjects who completed experiment and aren't excluded
    if row['status'] in statuses and row['uniqueid'] not in exclude:
        data.append(row[data_column_name])

# Now we have all participant datastrings in a list.
# Let's make it a bit easier to work with:

# parse each participant's datastring as json object
# and take the 'data' sub-object
data = [json.loads(part)['data'] for part in data]

# insert a few things into the data array
for part in data:
    for record in part:
        trialdata = record['trialdata']
        try:
            trialdata.insert(0, record['dateTime'])
            trialdata.insert(0, record['uniqueid'])
        except AttributeError:
            continue 

# flatten nested list so we just have a list of the trialdata recorded
# each time psiturk.recordTrialData(trialdata) was called.
data = [record['trialdata'] for part in data for record in part
                       if isinstance(record['trialdata'], list)]

def addLanguage(data, header):
    added = []
    language = ''
    for line in reversed(data):
        if len(line) < len(header) - 1:
            language = line[-1]
        else:
            line.insert(2, language.lower())
	    added.insert(0, line)
    return added

data = addLanguage(data, rating_header)
# Put all subjects' trial data into a dataframe object from the
# 'pandas' python library: one option among many for analysis
data_frame = pd.DataFrame(data)
data_frame.to_csv('data.csv', header = rating_header, index = False)
