import {useState} from "react";

export default function TopComponent() {

    const [selectedEventType, setSelectedEventType] = useState('');

    const handleEventTypeChange = (event) => {
        setSelectedEventType(event.target.value);
    };

    return (
        <div>
            <div>
                Найкращий заклад для...
                <select value={selectedEventType} onChange={handleEventTypeChange}>
                    <option value="Корпоратив">Корпоративу</option>
                    <option value="День народження">Дня народження</option>
                    <option value="Весілля">Весілля</option>
                </select>
                {selectedEventType && <p> {selectedEventType}</p>}

            </div>
        </div>
    );
}