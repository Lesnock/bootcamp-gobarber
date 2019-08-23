class Collection
{
    constructor (collection = [])
    {
        this.collection = collection
    }

    all ()
    {
        return this.collection
    }

    get (fields = [])
    {
        return this.collection.map(item => {
            if (! fields) 
                return item

            const newItem = {}

            fields.forEach(field => newItem[field] = item[field])

            return newItem
        })
    }
}

export default Collection