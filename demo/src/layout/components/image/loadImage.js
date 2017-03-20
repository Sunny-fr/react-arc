const loadImage = path =>
    new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({path, status: 'loaded'});
        img.onerror = (e) => resolve({path, status: e});
        img.src = path;
    });


export default loadImage