import numpy as np
import torch 
from torch import nn
import torch.nn.functional as F
from torch.utils.data import DataLoader

# Text classifier neural network 
# Takes the dimensions of the input text (input rows, cols)
class text_classifier(nn.Module):
    # Initialize the classifier
    def __init__(self, rows, cols):
        super(text_classifier, self).__init__()
        
        # Convolutional layer 
        self.conv = nn.Conv2d(1, 6, 3)
        
        # Max pooling 
        self.pool = nn.MaxPool2d(2, 2)
        
        # Compute the dimensions of the final channel
        x = torch.rand(1, 1, rows, cols)
        x = self.pool(F.relu(self.conv(x)))
        self.dim1 = x.size()[2]
        self.dim2 = x.size()[3]
        
        # Fully connected layers
        self.encoder = nn.Sequential(
            nn.Linear(6 * self.dim1 * self.dim2, 4),
            nn.Sigmoid(), 
            nn.Linear(4, 2)
        )
        
    # Classify the text x
    def forward(self, x):
        x = self.pool(F.relu(self.conv(x)))
        x = x.view(-1, 6 * self.dim1 * self.dim2)
        x = self.encoder(x)
        return x

# Dataset for model training  
class dataset(torch.utils.data.Dataset):
    # Initialize dataset with data and corresponding labels
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels
        
    # Get values returned with each iteration of the dataset
    def __getitem__(self, index):
        input1 = self.data[index]
        input2 = self.labels[index]
        return input1, input2
    
    # Get the number of data, label pairs in the dataset
    def __len__(self):
        return len(self.data)
    
# Given a string s, the maximum number of words that can be in s, and the maximum possible length 
# of a word in s, converts s to a 2-D array of integers and returns the array. In the return array,
# each value corresponds with the integer representation of a character in s, and 
# each row corresponds with a word in s (words are considered to be separated by spaces). 
# Extraneous space is filled with integer representations of the space character. 
def process_string(s, max_num, max_len):
    processed = np.ones((max_num, max_len), dtype=int) * 32
    words = s.lower().split()
    for i, word in enumerate(words): # For each word in s
        if (len(word) < max_len):
            for k in range(max_len - len(word)):
                word += ' '
        chars = list(word)
        numbers = [ord(char) for char in chars]
        processed[i, :] = np.array(numbers)
    return processed

# Given the file location of the train data, parses the file for phrases and their respective 
# classification. Returns phrase data normalized (words x characters x phrases) and labels 
# (phrases x classification and classification complement), as numpy arrays. 
def get_train_data(file_location):
    f = open(file_location, 'r') # Read the file
    data = []
    labels = []
    max_num = 0
    max_len = 0 
    
    while True: 
        next_line = f.readline()
        if not next_line: # EOF
            break
            
        # Phrases and relevance are separated by a '\t' character 
        i = next_line.find('\t')
        phrase = next_line[:i]
        relevant = next_line[i + 1:i + 2]
        if (relevant == 'Y'):
            relevant = 1
        else: # relevant = 'N'
            relevant = 0
        data.append(phrase)
        labels.append(relevant)

        # Examine words in phrase to get max_num and max_len
        words = phrase.split()
        if (len(words) > max_num):
            max_num = len(words)
        for word in words:
            if (len(word) > max_len):
                max_len = len(word)
                
    f.close() # Close file
    num_data = len(data)
    
    # Finish processing the data
    # Convert phrase data to array representation and normalize
    train_data = np.empty((max_num, max_len, num_data))
    for i, phrase in enumerate(data): 
        train_data[:, :, i] = process_string(phrase, max_num, max_len)
    # Normalize 
    min_val = np.min(train_data)
    max_val = np.max(train_data)
    train_data = (train_data - min_val) / (max_val - min_val)
    # Append the complementary classification to each label
    label_data = np.array(labels)
    label_comp = np.ones(num_data, dtype=int) - label_data
    label_data = np.hstack((label_data.reshape(-1, 1), label_comp.reshape(-1, 1)))
    
    return train_data, label_data