# Initial order data
order = {
    'product': ['A', 'B', 'C', 'D', 'E'],
    'Quantity': [2, 5, 7, 4, 3],
    'price': [10, 8, 2, 12, 6]
}

# Step 1: Add G and H to the order
order['product'].extend(['G'])
order['Quantity'].extend([20])
order['price'].extend([1])

order['product'].insert(4, 'H')
order['Quantity'].insert(4, 6)
order['price'].insert(4, 9)

# Step 2: Replace E and G with M, N, P
A = order['product'].index('E')
B = order['product'].index('G')

# Modify based on index for replacement
order['product'][A] = 'M'
order['product'][B:] = ['N', 'P']
order['Quantity'][A] = 3
order['Quantity'][B:] = [5, 1]
order['price'][A] = 10
order['price'][B:] = [3, 7]

# Step 3: Remove product C from the order
order['product'].remove('C')
order['Quantity'].remove(7)
order['price'].remove(2)

# Q2: Calculate the total price by summing the prices
total_price = sum(order['price'])

# Q1: Final order
print("Final Order:")
print(order)

print("Total price of the final order:", total_price)
