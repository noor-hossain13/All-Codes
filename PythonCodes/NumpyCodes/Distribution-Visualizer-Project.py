import numpy as np
import matplotlib.pyplot as plt

def visualize_distribution():
    print("\n" + "="*50)
    print("📊 DISTRIBUTION VISUALIZER")
    print("="*50)
    
    distributions = {
        '1': 'Normal',
        '2': 'Uniform',
        '3': 'Binomial',
        '4': 'Poisson',
        '5': 'Logistic',
        '6': 'Multinomial'
    }
    
    for key, name in distributions.items():
        print(f"{key}. {name}")
    print("="*50)
    
    choice = input("\nChoose a distribution (1-6): ").strip()
    
    n_samples = int(input("How many samples do you want? (default 10000): ") or 10000)
    
    if choice == '1':  # Normal
        loc = float(input("Mean (loc) [default 0]: ") or 0)
        scale = float(input("Standard Deviation (scale) [default 1]: ") or 1)
        data = np.random.normal(loc=loc, scale=scale, size=n_samples)
        title = f"Normal Distribution (μ={loc}, σ={scale})"
        
    elif choice == '2':  # Uniform
        low = float(input("Minimum value [default 0]: ") or 0)
        high = float(input("Maximum value [default 10]: ") or 10)
        data = np.random.uniform(low=low, high=high, size=n_samples)
        title = f"Uniform Distribution ({low} to {high})"
        
    elif choice == '3':  # Binomial
        n = int(input("Number of trials (n) [default 10]: ") or 10)
        p = float(input("Probability of success (p) [default 0.5]: ") or 0.5)
        data = np.random.binomial(n=n, p=p, size=n_samples)
        title = f"Binomial Distribution (n={n}, p={p})"
        
    elif choice == '4':  # Poisson
        lam = float(input("Average rate (λ) [default 5]: ") or 5)
        data = np.random.poisson(lam=lam, size=n_samples)
        title = f"Poisson Distribution (λ={lam})"
        
    elif choice == '5':  # Logistic
        loc = float(input("Location (mean) [default 0]: ") or 0)
        scale = float(input("Scale [default 1]: ") or 1)
        data = np.random.logistic(loc=loc, scale=scale, size=n_samples)
        title = f"Logistic Distribution (loc={loc}, scale={scale})"
        
    elif choice == '6':  # Multinomial
        print("\nMultinomial needs probabilities that sum to 1")
        k = int(input("How many categories? (e.g. 6 for dice): "))
        probs = []
        for i in range(k):
            p = float(input(f"Probability for category {i+1}: "))
            probs.append(p)
        data = np.random.multinomial(n=20, pvals=probs, size=n_samples)
        # For visualization, we'll show sum or one category
        data = data.sum(axis=1)   # total per trial
        title = f"Multinomial Distribution ({k} categories)"
        
    else:
        print("Invalid choice!")
        return
    
    # ==================== Statistics ====================
    print("\n" + "-"*40)
    print("📈 STATISTICS")
    print("-"*40)
    print(f"Mean (calculated)     : {data.mean():.4f}")
    print(f"Standard Deviation    : {data.std(ddof=1):.4f}")
    print(f"Minimum               : {data.min()}")
    print(f"Maximum               : {data.max()}")
    
    # ==================== Plotting ====================
    plt.figure(figsize=(10, 6))
    plt.hist(data, bins=50, density=True, alpha=0.7, color='skyblue', edgecolor='black')
    plt.title(title, fontsize=14)
    plt.xlabel('Value')
    plt.ylabel('Density')
    plt.grid(True, alpha=0.3)
    
    # Add mean line
    plt.axvline(data.mean(), color='red', linestyle='dashed', linewidth=2, label=f'Mean = {data.mean():.2f}')
    plt.legend()
    plt.show()

# Run the visualizer
if __name__ == "__main__":
    while True:
        visualize_distribution()
        again = input("\nDo you want to try another distribution? (y/n): ").strip().lower()
        if again != 'y':
            print("Thanks for using the Distribution Visualizer! 👋")
            break