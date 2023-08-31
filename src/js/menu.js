// Business Logic for Menu ---------
export function Menu() {
    this.entries = [];
    this.currentId = 0;
}

Menu.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

Menu.prototype.addEntry = function (entry) {
    // Check for duplicate entries based on the data
    const existingEntry = this.entries.find(e => JSON.stringify(e.data) === JSON.stringify(entry.data));
    if (!existingEntry) {
        entry.id = this.assignId();
        this.entries.push(entry);
        return true; // Entry added successfully
    }
    return false; // Entry already exists
};

// Business Logic for Entries ---------
export function Entry(data) {
    this.data = data
}

// Business Logic for Submenu Entries ---------
export function SubmenuEntry(title, body) {
    this.title = title;
    this.body = body;
}

export function Service() {
    this.entries = {};
    this.currentId = 0;
}

Service.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

Service.prototype.addEntries = function (entry) {
    entry.id = this.assignId();
    this.entries[entry.id] = entry;
};

Service.prototype.findEntry = function (id) {
    if (this.entries[id] != undefined) {
        return this.entries[id];
    }
    return false;
};

Service.prototype.deleteEntry = function (id) {
    if (this.entries[id] === undefined) {
        return false;
    }
    delete this.entries[id];
    return true;
};



