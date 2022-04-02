
import pandas as pd
import numpy as np
import json
import csv
import collections
import matplotlib.pyplot as plt 
import seaborn as sns

pd.set_option('display.max_colwidth', 300)
movies_list = [i.strip().split("::") for i in open('C:/Users/7000027560/Downloads/ml-1m/movies1.dat', 'r').readlines()]
movies_df = pd.DataFrame(movies_list, columns = ['MovieID', 'Title','Genres'])
#print(type(movies_df['Genres'][0]))
#type(json.loads(movies_df['Genres'][0]))

genre=movies_df['Genres']
#print(genre[:10])
genre_list=[genres.strip().split("|") for genres in genre]

print(genre_list[:10])
print(len(genre_list))
flatList = [ item for elem in genre_list for item in elem]
print('List of genres: ', flatList)  
occurrences = collections.Counter(flatList)
print(occurrences)

all_genres_df = pd.DataFrame({'Genre': list(occurrences.keys()), 
                              'Count': list(occurrences.values())})

g = all_genres_df.nlargest(columns="Count", n = 50) 
plt.figure(figsize=(12,15)) 
ax = sns.barplot(data=g, x= "Count", y = "Genre") 
ax.set(ylabel = 'Count') 
plt.show()