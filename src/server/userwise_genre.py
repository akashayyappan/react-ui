import pandas as pd
import matplotlib.pyplot as plt

xslvalues = pd.read_excel('C:/Users/7000027560/Downloads/ml-1m/sample.xlsx',
names=['title', 'genres', 'user_id', 'rating'])

# genrecount= 
prodcount = (xslvalues.groupby(["user_id", "genres"], as_index=False)["genres"].size())

expenses = prodcount[prodcount['user_id'] == 2]
print(expenses)

def func(pct):
    return "{:1.1f}%".format(pct)

plt.pie(expenses['size'], labels=expenses['genres'], autopct=lambda pct: func(pct), shadow=True)
plt.title('Userchart based on Genre')
plt.axis('equal')
plt.show()