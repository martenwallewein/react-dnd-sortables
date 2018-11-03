interface IDraggableInfo {
    id: string;
    /**
     * Currently only filled if the item is dropped into the same list
     */
    sourceIndex?: number;
}

export {
    IDraggableInfo
};
