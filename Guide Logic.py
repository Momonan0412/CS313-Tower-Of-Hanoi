# Number of moves 2^(n)-1
# ODD
# i % 3 = 1 -> Source To Destination or Vice Versa
# i % 3 = 2 -> Source To Auxiliary or Vice Versa
# i % 3 = 0 -> Auxiliary to Destination or Vice Versa
# EVEN
# i % 3 = 1 -> Source To Auxiliary or Vice Versa
# i % 3 = 2 -> Source To Destination or Vice Versa
# i % 3 = 0 -> Auxiliary to Destination or Vice Versa
            
            
# Example usage:
n = 4  # Number of disks (change to an even number to test even behavior)
source = list(range(n, 0, -1))  # Peg A, with disks [n, n-1, ..., 1]
auxiliary = []  # Peg B (empty)
destination = []  # Peg C (empty)

def move_disk(pole_one, pole_two, string_pole_one, string_pole_two):
    if pole_one and pole_two:
        if pole_one[-1] < pole_two[-1]:     # Move from pole_one to pole_two
            pole_two.append(pole_one.pop())
            print(f"{string_pole_one}:{pole_one} => {string_pole_two}:{pole_two}")
        else:                               # Move from pole_two to pole_one
            pole_one.append(pole_two.pop())
            print(f"{string_pole_two}:{pole_two} => {string_pole_one}:{pole_one}")
    else:
        if pole_one and not pole_two:
            pole_two.append(pole_one.pop())
            print(f"{string_pole_one}:{pole_one} => {string_pole_two}:{pole_two}")
        elif pole_two and not pole_one:
            pole_one.append(pole_two.pop())
            print(f"{string_pole_two}:{pole_two} => {string_pole_one}:{pole_one}")
    
    print(f"\nCurrent: {source}, Auxiliary: {auxiliary}, Destination: {destination}\n")
        
def tower_of_hanoi(n, source, auxiliary, destination):
    if(n % 2 == 0):
        even_disc(n, source, auxiliary, destination)
    else:
        odd_disc(n, source, auxiliary, destination)
        
def even_disc(n, source, auxiliary, destination):
    total_moves  = 2**n-1
    pegs = [source, destination, auxiliary]
    for i in range(1, total_moves  + 1):
        if i % 3 == 1:
            move_disk(source, auxiliary, "source", "auxiliary")
        elif i % 3 == 2:
            move_disk(source, destination, "source", "destination")
        elif i % 3 == 0:
            move_disk(auxiliary, destination, "auxiliary", "destination")

def odd_disc(n, source, auxiliary, destination):
    total_moves  = 2**n-1
    pegs = [source, destination, auxiliary]
    for i in range(1, total_moves  + 1):
        if i % 3 == 1:
            move_disk(source, destination, "source", "destination")
        elif i % 3 == 2:
            move_disk(source, auxiliary, "source", "auxiliary")
        elif i % 3 == 0:
            move_disk(auxiliary, destination, "auxiliary", "destination")


print("Initial state:")
print(f"Source: {source}, Auxiliary: {auxiliary}, Destination: {destination}")
tower_of_hanoi(n, source, auxiliary, destination)
print("Final state:")
print(f"Source: {source}, Auxiliary: {auxiliary}, Destination: {destination}")


# SOURCE: https://www.youtube.com/watch?v=XSz3Woir3sY LOGIC!
# SOURCE: https://www.youtube.com/watch?v=cZDydAdFrqg LOGIC!