// Inventory Management System - Main Application Logic
// This file handles all CRUD operations and data persistence

class InventoryManager {
    constructor() {
        this.storageKey = 'inventoryData';
        this.initializeData();
    }

    // Initialize data from localStorage or use default data
    initializeData() {
        const storedData = localStorage.getItem(this.storageKey);
        if (storedData) {
            try {
                this.items = JSON.parse(storedData);
            } catch(e) {
                console.error('Error parsing stored data:', e);
                this.loadDefaultData();
            }
        } else {
            this.loadDefaultData();
        }
    }

    // Load default data
    loadDefaultData() {
        this.items = [
            { id: 1, name: "Blazer (Female)", quantity: 20, type: "Outerwear", unitPrice: 129.00, totalPrice: 2580.00 },
            { id: 2, name: "Bomber Jacket", quantity: 70, type: "Outerwear", unitPrice: 269.00, totalPrice: 18830.00 },
            { id: 3, name: "Briefs (Male)", quantity: 3000, type: "Underwear", unitPrice: 45.99, totalPrice: 137970.00 },
            { id: 4, name: "Checkered Flannel", quantity: 12, type: "Outerwear", unitPrice: 140.00, totalPrice: 1680.00 },
            { id: 5, name: "Denim Jeans", quantity: 31, type: "Pants", unitPrice: 129.00, totalPrice: 3999.00 },
            { id: 6, name: "Hoodie", quantity: 75, type: "Outerwear", unitPrice: 60.50, totalPrice: 4537.50 },
            { id: 7, name: "Jujutsu Kaisen Tee Shirt", quantity: 67, type: "Shirt", unitPrice: 80.00, totalPrice: 5360.00 },
            { id: 8, name: "Long Sleeve Shirt", quantity: 45, type: "Shirt", unitPrice: 79.00, totalPrice: 3555.00 },
            { id: 9, name: "Nike Air Force One", quantity: 6, type: "Shoes", unitPrice: 499.00, totalPrice: 2994.00 },
            { id: 10, name: "Polo Shirt", quantity: 27, type: "Shirt", unitPrice: 50.00, totalPrice: 1350.00 },
            { id: 11, name: "Slacks", quantity: 57, type: "Pants", unitPrice: 89.00, totalPrice: 5073.00 },
            { id: 12, name: "Winnie the Pooh Socks", quantity: 450, type: "Socks", unitPrice: 15.10, totalPrice: 6795.00 }
        ];
        this.saveData();
    }

    // Save data to localStorage
    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            console.log('✅ Data saved to localStorage');
        } catch(e) {
            console.error('Error saving data:', e);
        }
    }

    // Get all items
    getAll() {
        return this.items || [];
    }

    // Get item by ID
    getById(id) {
        return this.items.find(item => item.id === parseInt(id));
    }

    // Add new item
    add(item) {
        const newItem = {
            id: this.items.length > 0 ? Math.max(...this.items.map(i => i.id)) + 1 : 1,
            name: item.name,
            quantity: parseInt(item.quantity),
            type: item.type,
            unitPrice: parseFloat(item.unitPrice),
            totalPrice: parseFloat(item.quantity) * parseFloat(item.unitPrice)
        };
        this.items.push(newItem);
        this.saveData();
        console.log('✅ Item added:', newItem);
        return newItem;
    }

    // Update item
    update(id, item) {
        const index = this.items.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            this.items[index] = {
                id: parseInt(id),
                name: item.name,
                quantity: parseInt(item.quantity),
                type: item.type,
                unitPrice: parseFloat(item.unitPrice),
                totalPrice: parseFloat(item.quantity) * parseFloat(item.unitPrice)
            };
            this.saveData();
            console.log('✅ Item updated:', this.items[index]);
            return this.items[index];
        }
        return null;
    }

    // Delete item
    delete(id) {
        const index = this.items.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            const deletedItem = this.items[index];
            this.items.splice(index, 1);
            this.saveData();
            console.log('✅ Item deleted:', deletedItem);
            return true;
        }
        return false;
    }

    // Search items
    search(query) {
        return this.items.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.type.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Get total inventory value
    getTotalValue() {
        return this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    }

    // Get low stock items (quantity < 50)
    getLowStockItems() {
        return this.items.filter(item => item.quantity < 50);
    }

    // Format price as RM
    formatPrice(amount) {
        return 'RM ' + parseFloat(amount).toFixed(2);
    }
}

// Initialize the manager globally IMMEDIATELY
try {
    window.inventoryManager = new InventoryManager();
    console.log('✅ InventoryManager initialized successfully');
} catch(e) {
    console.error('❌ Failed to initialize InventoryManager:', e);
}
