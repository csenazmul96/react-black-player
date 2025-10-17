"use client"


function BufferIcon({poster}:{poster:String}) {
    return (
        <div className="absolute inset-0 z-5 pointer-events-none"
             style={{
                 backgroundImage: `url(${poster})`,
                 backgroundSize: 'contain',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 backgroundColor: '#000000',
             }}
        />
    );
}

export default BufferIcon;