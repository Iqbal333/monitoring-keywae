export const getYearMake = () => {
    const date = new Date()
    const stop = date.getFullYear()
    const start = stop - 10
    const step = 1
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => {
        return {
            label: start + i * step,
            value: start + i * step
        }
    })
}

export const IS_EMPTY_OBJECT = (obj) => {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}