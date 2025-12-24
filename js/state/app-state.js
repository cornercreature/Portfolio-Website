// ============================================================================
// STATE MANAGEMENT
// ============================================================================

export let currentlyOpenWorkId = null;

export function setCurrentlyOpenWorkId(id) {
    currentlyOpenWorkId = id;
}

export function getCurrentlyOpenWorkId() {
    return currentlyOpenWorkId;
}
