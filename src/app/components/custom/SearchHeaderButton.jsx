import { Button } from 'primereact/button';

export default function CustomHeaderButton(props) {

    return (
        <Button
            label={props.label}
            onClick={props.onClick}
            rounded
            className="w-auto mx-2 px-10 py-2 text-center text-sm font-bold bg-white-alpha-90 border-transparent text-900 hover:text-900"
        />

    );
}

