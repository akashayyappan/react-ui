# import warnings
import pandas as pd
import numpy as np
# import scipy as sc
import matplotlib.pyplot as plt
# import seaborn as sns

plt.style.use('fivethirtyeight')
# warnings.filterwarnings('ignore')

# movies_list = [i.strip().split("::") for i in open('C:/Users/7000027560/Downloads/ml-1m/movies.dat', 'r').readlines()]
# movies = pd.DataFrame(movies_list, columns = ['movie_id', 'movie_title', 'genres'])

xslvalues = pd.read_excel('C:/Users/7000027560/Downloads/ml-1m/sample.xlsx',
names=['title', 'genres', 'user_id', 'rating'])

genre=xslvalues['genres']

prodcount = (xslvalues.groupby(["user_id", "genres"], as_index=False)["rating"].sum())
print(prodcount)

expenses = prodcount[prodcount['user_id'] == 2]
print(expenses)
#---------------user chart based on ratings--------#
# labels = ['Action', 'Animation', 'Childrens', 'Drama', 'Romance','Thriller']
def func(pct):
    return "{:1.1f}%".format(pct)

plt.pie(expenses['rating'], labels=expenses['genres'], autopct=lambda pct: func(pct), shadow=True)
plt.title('User wise')
plt.axis('equal')
plt.show()

#--------- user chart based on genre watched more-----------#

genrecount = (xslvalues.groupby(["user_id", "genres"], as_index=False)["genres"].size())
expenses = genrecount[genrecount['user_id'] == 2]

def func(pct):
    return "{:1.1f}%".format(pct)

plt.pie(expenses['size'], labels=expenses['genres'], autopct=lambda pct: func(pct), shadow=True)
plt.title('Userchart based on Genre')
plt.axis('equal')
plt.show()