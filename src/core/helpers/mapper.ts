export function converToType<T>(obj: any | any[], targetType: new () => T): T | any {
    const createInstance = (target: any): T => {
        const newObject = new targetType();
        Object.keys(target).forEach((key) => {
            newObject[key] = target[key];
        });
        return newObject;
    };
    if (Array.isArray(obj)) {
        return obj.map((item: any) => createInstance(item));
    }
    return createInstance(obj);
}
