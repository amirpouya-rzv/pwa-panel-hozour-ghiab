import React from "react";
import CardItem from "./CardItem";

function EmployeeList({ cards, onCardClick, onDelete }) {
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-5 overflow-hidden dark:bg-lightgray rounded-3xl ">
            {cards.map(card => (
                <CardItem
                    key={card.id}
                    card={card}
                    onClick={() => onCardClick(card.id)}
                    onDelete={() => onDelete(card)}
                />
            ))}
        </div>
    );
}

export default EmployeeList;
