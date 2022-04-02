import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

movies = pd.read_csv(r'C:\Users\7000027560\Downloads\movies\movies_metadata.csv')
#print(movies['overview'][0])

tfidf = TfidfVectorizer(stop_words='english')
movies['overview'] = movies['overview'].fillna('')

overview_matrix = tfidf.fit_transform(movies['overview'])
#print(overview_matrix.shape)

similarity_matrix = linear_kernel(overview_matrix,overview_matrix)

mapping = pd.Series(movies.index,index = movies['title'])

def recommend_movies_based_on_plot(movie_input):
    movie_index = mapping[movie_input]
    similarity_score = list(enumerate(similarity_matrix[movie_index]))
    similarity_score = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    similarity_score = similarity_score[1:15]
    movie_indices = [i[0] for i in similarity_score]
    return (movies['title'].iloc[movie_indices])
