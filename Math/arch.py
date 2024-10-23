import numpy as np
import matplotlib.pyplot as plt

# parameters
radius = 1
center_x = 0
center_y = 0
t = np.linspace(0, np.pi, 100) # parameter from 0 - PI

# Arch Coordinates
x = center_x + radius * np.sin(t)
y = center_y - radius * (1 - np.cos(t))

# color mapping
colors = plt.cm.rainbow(np.linespace(0, 1, 100))

# Create the plot
plt.figure(figsize=(8, 4))
for i in range(len(t) -1):
    plt.fill_between(x[i:i+2], y[i:i+2], color=colors[i])


plt.xlim(-1.5, 1.5)
plt.ylim(-1.5, 1.5)
plt.axis('equal')
plt.title('Rainbow Arch Visualization')
plt.show()