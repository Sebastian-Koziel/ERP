

exports.getAll = async (req, res, next ) => {
   
    console.log('test')
    try {
        res.json([
            { id: 1, name: 'Test1' },
            { id: 2, name: 'Test2' },
            { id: 3, name: 'Test3' }
        ]);
    }
    catch (error) {
        
    }
    
};