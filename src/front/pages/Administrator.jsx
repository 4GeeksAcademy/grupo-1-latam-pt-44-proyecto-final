import React, { useState } from "react";
import { NavbarAdministrator } from "../components/Administrator/NavbarAdministrator";
import { Sidebar } from "../components/Administrator/Sidebar";
import { TableUsers } from "../components/Administrator/TableUsers";
import { TableCategories } from "../components/Administrator/TableCategories";
import { TableStories } from "../components/Administrator/TableStories";

export const Administrator = () => {

    const [selectedTable, setSelectedTable] = useState("stories")

    return (

        <div className="d-flex flex-column vh-100">
            <NavbarAdministrator />
            <div className="d-flex align-items-start">
                <Sidebar changeTable = {setSelectedTable} />
                {
                    selectedTable === "users" &&
                    <TableUsers />
                }
                {
                    selectedTable === "categories" &&
                    <TableCategories />
                }
                {
                    selectedTable === "stories" &&
                    <TableStories />
                }
                
                
            </div>

        </div>

    )

}