
export function Image({ url }) {

    return (
        <div key={url} className="m-4">
            <img src={url} alt="img"/>
        </div>
    );
}
