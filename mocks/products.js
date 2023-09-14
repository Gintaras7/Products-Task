export function fetchProductsFromAPI() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Laptop",
                    description: "High-performance laptop with 16GB RAM and 512GB SSD",
                    price: 1200,
                    availability: "In Stock",
                },
                {
                    id: 2,
                    title: "Smartphone",
                    description:
                        "Latest model smartphone with a stunning camera and fast processor",
                    price: 800,
                    availability: "Out of Stock",
                },
                {
                    id: 3,
                    title: "Headphones",
                    description:
                        "Wireless over-ear headphones with noise-canceling feature",
                    price: 250,
                    availability: "In Stock",
                },
                {
                    id: 4,
                    title: "Smartwatch",
                    description:
                        "Water-resistant smartwatch with heart rate and sleep tracking",
                    price: 300,
                    availability: "In Stock",
                },
                {
                    id: 5,
                    title: "Tablet",
                    description: "10-inch tablet with powerful multitasking capabilities",
                    price: 600,
                    availability: "Out of Stock",
                },
            ]);
        }, 1000);
    });
}

export function processCheckout(cartItems) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (const item of cartItems) {
                if (item.quantity <= 0) {
                    reject(new Error(`Product with ID ${item.id} has invalid quantity!`));
                    return;
                }

                if (item.availability === "Out of Stock") {
                    reject(new Error(`Product with ID ${item.id} is out of stock!`));
                    return;
                }
            }

            resolve(true);
        }, 2000);
    });
}