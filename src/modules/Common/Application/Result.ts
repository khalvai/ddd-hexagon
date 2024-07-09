import Exception from "src/modules/Common/Domain/SeedWorks/Exceptions/Exception";
type Result<V, F = Exception> =
    | { ok: V; }
    | { failure: F; };


export default Result;