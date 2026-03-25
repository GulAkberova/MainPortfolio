import React, { useState, useEffect } from "react";
import styles from "./seenWorks.module.css";
import { useTranslation } from "react-i18next";

const SeenWorks = () => {
  const { t } = useTranslation();
  const worksData = t("seenWorks.works", { returnObjects: true });

  const [filters, setFilters] = useState({
    type: [],
    company: [],
    tool: [],
    year: [],
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const uniqueValues = {
    type: [...new Set(worksData.map((w) => w.type))],
    company: [...new Set(worksData.map((w) => w.company))],
    tool: [...new Set(worksData.flatMap((w) => w.tools))],
    year: [...new Set(worksData.map((w) => w.year))],
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: alreadySelected
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
    });

    // ✅ filter dəyişəndə page reset
    setCurrentPage(1);
  };

  const filteredWorks = worksData.filter((work) => {
    const matchType =
      filters.type.length === 0 || filters.type.includes(work.type);
    const matchCompany =
      filters.company.length === 0 ||
      filters.company.includes(work.company);
    const matchTool =
      filters.tool.length === 0 ||
      filters.tool.some((t) => work.tools.includes(t));
    const matchYear =
      filters.year.length === 0 || filters.year.includes(work.year);

    return matchType && matchCompany && matchTool && matchYear;
  });

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);

  const paginatedWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll effect
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const getPages = () => {
    const pages = [];
  
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }
  
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }
  
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
  
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <section className={styles.seenWorks}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("seenWorks.title")}</h2>

        {/* Filter button */}
        <div
          className={`${styles.filterBar} ${
            scrolled ? styles.filterBarScrolled : ""
          }`}
        >
          <button
            className={styles.filterButton}
            onClick={() => setIsFilterOpen(true)}
          >
            🔍
             {/* {t("seenWorks.filtersTitle")} */}
          </button>
        </div>

        <div className={styles.layout}>
          {isFilterOpen && (
            <div
              className={styles.overlay}
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`${styles.sidebar} ${
              isFilterOpen ? styles.sidebarOpen : ""
            }`}
          >
            <div className={styles.sidebarHeader}>
              <h3>{t("seenWorks.filtersTitle")}</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setIsFilterOpen(false)}
              >
                ✕
              </button>
            </div>

            {Object.entries(uniqueValues).map(([key, values]) => (
              <div key={key} className={styles.filterGroup}>
                <h4>{t(`seenWorks.filterCategories.${key}`)}</h4>
                {values.map((value) => (
                <label key={value} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={filters[key].includes(value)}
                  onChange={() => handleFilterChange(key, value)}
                />
              
                {/* 🔥 custom checkbox */}
                <span className={styles.customCheckbox}></span>
              
                {value}
              </label>
                ))}
              </div>
            ))}
          </aside>

          {/* Cards */}
          <div className={styles.grid}>
            {paginatedWorks.length ? (
              paginatedWorks.map((work, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.imageBox}>
                    <img src={work.image} alt={work.title} />
                  </div>

                  <div className={styles.content}>
                    <h3>{work.title}</h3>
                    <p className={styles.type}>{work.type}</p>
                    <p className={styles.desc}>
                      {work.description}
                    </p>

                    <div className={styles.extraInfo}>
                      <p>
                        <strong>
                          {t("seenWorks.labels.year")}:
                        </strong>{" "}
                        {work.year}
                      </p>
                      <p>
                        <strong>
                          {t("seenWorks.labels.company")}:
                        </strong>{" "}
                        {work.company}
                      </p>
                      <p>
                        <strong>
                          {t("seenWorks.labels.status")}:
                        </strong>{" "}
                        {work.status}
                      </p>
                      <p>
                        <strong>
                          {t("seenWorks.labels.tools")}:
                        </strong>{" "}
                        {work.tools.join(", ")}
                      </p>
                    </div>

                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btn}
                    >
                      {t("seenWorks.button")}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noResult}>
                {t("seenWorks.noResult")}
              </p>
            )}
              {/* ✅ Pagination UI */}
              {totalPages > 1 && (
  <div className={styles.pagination}>
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
    >
      ◀
    </button>

    {getPages().map((page, i) =>
      page === "..." ? (
        <span key={i} className={styles.dots}>...</span>
      ) : (
        <button
          key={i}
          className={
            currentPage === page ? styles.activePage : ""
          }
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      )
    )}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
    >
      ▶
    </button>
  </div>
)}
          </div>
        </div>

    
      </div>
    </section>
  );
};

export default SeenWorks;