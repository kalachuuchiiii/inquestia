    import type { JSX } from "react";

    interface AuthLayoutInterface {
    hero: JSX.Element;
    children: JSX.Element;
    }

    export const AuthLayout = ({ hero, children }: AuthLayoutInterface) => {
    return (
        <div className="space-y-10 grid grid-rows-2 align-content-start sm:grid-cols sm:grid-cols-2  w-full pl-6 pt-8">
        <>{hero}</>
        <div className="p-6 rounded-xl max-w-lg outline-1 outline-black/10 shadow-md">{children}</div>
        </div>
    );
    };



