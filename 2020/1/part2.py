with open("input.txt", 'r') as f:
    lines = f.read().splitlines()
    lines = list(map(lambda x: int(x), lines))
    
    for i in range(len(lines)):
        for j in range(i, len(lines)):
            if lines[i] + lines[j] < 2020:
                for k in range(j, len(lines)):
                    if lines[i] + lines[j] + lines[k] == 2020:
                        print(lines[i] * lines[j] * lines[k])
                        break