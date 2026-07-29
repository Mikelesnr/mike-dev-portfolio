import { useEffect, useState, useCallback } from "react";
import axios from "axios";

/**
 * Fetches the paginated /projects endpoint and exposes simple
 * page-change handling. Keeps Work.jsx free of data-fetching detail.
 */
export default function useProjects() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchProjects = useCallback(async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`/projects?page=${page}`);
            setProjects(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects(1);
    }, [fetchProjects]);

    return {
        projects,
        currentPage,
        lastPage,
        loading,
        goToPage: fetchProjects,
    };
}
