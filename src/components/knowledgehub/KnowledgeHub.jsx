import React, { useState, useEffect, useRef } from "react";
import styles from "./knowledgeHub.module.css";
import { useTranslation } from "react-i18next";

const KnowledgeHub = () => {
  const { t } = useTranslation();

  const categories =
    t("knowledgeHub.categories", { returnObjects: true }) || [];
  const subCategories =
    t("knowledgeHub.subCategories", { returnObjects: true }) || [];
  const contentsData =
    t("knowledgeHub.contents", { returnObjects: true }) || [];

  // State-lər
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Dropdown Açılış State-ləri
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
   // 1. Yeni state-ləri əlavə et (Yuxarı hissəyə)
   const [sortBy, setSortBy] = useState("newest"); // Default olaraq ən yeni birinci gəlsin
   const [isSortOpen, setIsSortOpen] = useState(false);

  // Ref-lər (Kənara klikləyəndə bağlanması üçün)
  const catRef = useRef(null);
  const subRef = useRef(null);
  const levelRef = useRef(null);
  const tagRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // İstədiyin kimi hər səhifədə 3 kart

  // Data hələ yüklənməyibsə və ya boşdursa, xəta verməməsi üçün [] (boş massiv) mənimsədirik
  const safeContents = contentsData || [];
  const safeCategories = categories || [];
  const safeSubCategories = subCategories || [];

  // İndi unikal dəyərləri bu təhlükəsiz massivlərdən alırıq
  const uniqueLevels = [
    ...new Set(safeContents.map((c) => c?.level).filter(Boolean)),
  ];
  const uniqueTopics = [...new Set(safeContents.flatMap((c) => c?.tags || []))];

  const dynamicSubCategories = safeSubCategories.filter(
    (sub) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(sub?.category)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catRef.current && !catRef.current.contains(event.target))
        setIsCatOpen(false);
      if (subRef.current && !subRef.current.contains(event.target))
        setIsSubOpen(false);
      if (levelRef.current && !levelRef.current.contains(event.target))
        setIsLevelOpen(false);
      if (tagRef.current && !tagRef.current.contains(event.target))
        setIsTagOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ümumi Seçim Funksiyası (Max 2 Seçim Limitli)
  const handleSelect = (id, currentList, setList) => {
    if (currentList.includes(id)) {
      setList(currentList.filter((item) => item !== id));
    } else {
      if (currentList.length < 2) {
        setList([...currentList, id]);
      } else {
        alert(t("knowledgeHub.limitAlert", "Maksimum 2 seçim edə bilərsiniz!"));
      }
    }
    setCurrentPage(1);
  };

  const handleRemove = (id, currentList, setList, e) => {
    e.stopPropagation();
    setList(currentList.filter((item) => item !== id));
    setCurrentPage(1);
  };
  // 2. useEffect daxilinə kənara klikləmə yoxlamasını əlavə et
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Əvvəlki ref yoxlamaları...
      if (sortRef.current && !sortRef.current.contains(event.target))
        setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🛠️ Genişləndirilmiş Filtr Məntiqi
  const filteredContents = contentsData.filter((content) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(content.category);
    const matchSubCategory =
      selectedSubCategories.length === 0 ||
      selectedSubCategories.includes(content.subCategory);
    const matchLevel =
      selectedLevels.length === 0 || selectedLevels.includes(content.level);
    const matchTag =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => content.tags.includes(tag));

    const matchSearch =
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchCategory && matchSubCategory && matchLevel && matchTag && matchSearch
    );
  });
  // 🔥 Tarixə görə Sıralama Məntiqi (Sənin JSON-dakı "2026-07-08" formatını oxuyur)
  const sortedContents = [...filteredContents].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);

    if (sortBy === "newest") {
      return dateB - dateA; // Ən yeni tarixlər yuxarıda
    } else if (sortBy === "oldest") {
      return dateA - dateB; // Ən köhnə tarixlər yuxarıda
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedContents.length / itemsPerPage);
  const paginatedContents = sortedContents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPages = () => {
    if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
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
 
  const sortRef = useRef(null);
  // 2. useEffect daxilinə kənara klikləmə yoxlamasını əlavə et
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Əvvəlki ref yoxlamaları...
      if (sortRef.current && !sortRef.current.contains(event.target))
        setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className={styles.knowledgeHub}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {t("knowledgeHub.title", "Knowledge Hub")}
        </h2>

        {/* 4 Dropdown + 1 Search İnputlu Panel */}
        <div className={styles.filterBar}>
          {/* 1. Kateqoriyalar */}
          <div className={styles.dropdownContainer} ref={catRef}>
            <div
              className={styles.dropdownInput}
              onClick={() => setIsCatOpen(!isCatOpen)}
            >
              {selectedCategories.length === 0 ? (
                <span className={styles.placeholder}>
                  {t("knowledgeHub.selectCategory", "Kateqoriya")}
                </span>
              ) : (
                <div className={styles.selectedTagsContainer}>
                  {selectedCategories.map((id) => (
                    <span key={id} className={styles.selectedTag}>
                      {categories.find((c) => c.id === id)?.title || id}
                      <button
                        type="button"
                        onClick={(e) =>
                          handleRemove(
                            id,
                            selectedCategories,
                            setSelectedCategories,
                            e
                          )
                        }
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <span className={styles.arrow}>{isCatOpen ? "▲" : "▼"}</span>
            </div>
            {isCatOpen && (
              <div className={styles.dropdownMenu}>
                {safeCategories?.map(
                  (
                    cat // 👈 safeCategories və ?.map istifadə etdik
                  ) => (
                    <label key={cat.id} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() =>
                          handleSelect(
                            cat.id,
                            selectedCategories,
                            setSelectedCategories
                          )
                        }
                      />
                      <span className={styles.customCheckbox}></span>{" "}
                      {cat.title}
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          {/* 2. Alt Kateqoriyalar */}
          <div className={styles.dropdownContainer} ref={subRef}>
            <div
              className={styles.dropdownInput}
              onClick={() => setIsSubOpen(!isSubOpen)}
            >
              {selectedSubCategories.length === 0 ? (
                <span className={styles.placeholder}>
                  {t("knowledgeHub.selectSubCategory", "Alt Mövzu")}
                </span>
              ) : (
                <div className={styles.selectedTagsContainer}>
                  {selectedSubCategories.map((id) => (
                    <span key={id} className={styles.selectedTag}>
                      {subCategories.find((s) => s.id === id)?.title || id}
                      <button
                        type="button"
                        onClick={(e) =>
                          handleRemove(
                            id,
                            selectedSubCategories,
                            setSelectedSubCategories,
                            e
                          )
                        }
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <span className={styles.arrow}>{isSubOpen ? "▲" : "▼"}</span>
            </div>
            {/* 2. Alt Kateqoriyalar Dropdown */}
            {isSubOpen && (
              <div className={styles.dropdownMenu}>
                {dynamicSubCategories?.map(
                  (
                    sub // 👈 ?.map əlavə edildi
                  ) => (
                    <label key={sub.id} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedSubCategories.includes(sub.id)}
                        onChange={() =>
                          handleSelect(
                            sub.id,
                            selectedSubCategories,
                            setSelectedSubCategories
                          )
                        }
                      />
                      <span className={styles.customCheckbox}></span>{" "}
                      {sub.title}
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          {/* 3. Səviyyələr (Levels) */}
          <div className={styles.dropdownContainer} ref={levelRef}>
            <div
              className={styles.dropdownInput}
              onClick={() => setIsLevelOpen(!isLevelOpen)}
            >
              {selectedLevels.length === 0 ? (
                <span className={styles.placeholder}>
                  {t("knowledgeHub.selectLevel", "Səviyyə")}
                </span>
              ) : (
                <div className={styles.selectedTagsContainer}>
                  {selectedLevels.map((level) => (
                    <span key={level} className={styles.selectedTag}>
                      {level}
                      <button
                        type="button"
                        onClick={(e) =>
                          handleRemove(
                            level,
                            selectedLevels,
                            setSelectedLevels,
                            e
                          )
                        }
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <span className={styles.arrow}>{isLevelOpen ? "▲" : "▼"}</span>
            </div>
            {isLevelOpen && (
              <div className={styles.dropdownMenu}>
                {uniqueLevels?.map(
                  (
                    level // 👈 ?.map əlavə edildi
                  ) => (
                    <label key={level} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(level)}
                        onChange={() =>
                          handleSelect(level, selectedLevels, setSelectedLevels)
                        }
                      />
                      <span className={styles.customCheckbox}></span> {level}
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          {/* 4. Mövzular (Topics/Tags) */}
          <div className={styles.dropdownContainer} ref={tagRef}>
            <div
              className={styles.dropdownInput}
              onClick={() => setIsTagOpen(!isTagOpen)}
            >
              {selectedTags.length === 0 ? (
                <span className={styles.placeholder}>
                  {t("knowledgeHub.selectTopic", "Mövzular")}
                </span>
              ) : (
                <div className={styles.selectedTagsContainer}>
                  {selectedTags.map((tag) => (
                    <span key={tag} className={styles.selectedTag}>
                      #{tag}
                      <button
                        type="button"
                        onClick={(e) =>
                          handleRemove(tag, selectedTags, setSelectedTags, e)
                        }
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <span className={styles.arrow}>{isTagOpen ? "▲" : "▼"}</span>
            </div>
            {isTagOpen && (
              <div className={styles.dropdownMenu}>
                {uniqueTopics?.map(
                  (
                    tag // 👈 ?.map əlavə edildi
                  ) => (
                    <label key={tag} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() =>
                          handleSelect(tag, selectedTags, setSelectedTags)
                        }
                      />
                      <span className={styles.customCheckbox}></span> #{tag}
                    </label>
                  )
                )}
              </div>
            )}
          </div>
          {/* 5. Tarixə Görə Sıralama Dropdown-u */}
          <div className={styles.dropdownContainer} ref={sortRef}>
            <div
              className={styles.dropdownInput}
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span className={styles.currentSort}>
                ⏱️{" "}
                {sortBy === "newest"
                  ? t("knowledgeHub.sortNewest", "Ən yeni")
                  : t("knowledgeHub.sortOldest", "Ən köhnə")}
              </span>
              <span className={styles.arrow}>{isSortOpen ? "▲" : "▼"}</span>
            </div>

            {isSortOpen && (
              <div className={styles.dropdownMenu}>
                <div
                  className={`${styles.sortOption} ${
                    sortBy === "newest" ? styles.activeSortOpt : ""
                  }`}
                  onClick={() => {
                    setSortBy("newest");
                    setIsSortOpen(false);
                    setCurrentPage(1);
                  }}
                >
                  {t("knowledgeHub.sortNewest", "Ən yeni birinci")}
                </div>
                <div
                  className={`${styles.sortOption} ${
                    sortBy === "oldest" ? styles.activeSortOpt : ""
                  }`}
                  onClick={() => {
                    setSortBy("oldest");
                    setIsSortOpen(false);
                    setCurrentPage(1);
                  }}
                >
                  {t("knowledgeHub.sortOldest", "Ən köhnə birinci")}
                </div>
              </div>
            )}
          </div>

          {/* 6. Axtarış İnputu */}
          <input
            type="text"
            className={styles.searchInput}
            placeholder={t("knowledgeHub.searchPlaceholder", "Axtarış...")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Grid Layout (Artıq kənarda sidebar yoxdur, birbaşa full width grid gəlir) */}
        <div className={styles.fullGridContainer}>
          <div className={styles.grid}>
            {paginatedContents.length ? (
              paginatedContents.map((content) => (
                <div
                  key={content.id}
                  className={`${styles.card} ${
                    content.featured ? styles.featuredCard : ""
                  }`}
                >
                  {content.featured && (
                    <span className={styles.featuredBadge}>
                      {t("knowledgeHub.featured", "Önə Çıxan")}
                    </span>
                  )}
                  <div className={styles.imageBox}>
                    <img src={content.cover} alt={content.alt} />
                  </div>
                  <div className={styles.content}>
                    <div className={styles.metaRow}>
                      <span className={styles.level}>{content.level}</span>
                      <span className={styles.readTime}>⏱️ {content.date ? content.date.split("-").reverse().join(".") : ""}</span>
        
                    </div>
                    <h3>{content.title}</h3>
                    <p className={styles.excerpt}>{content.excerpt}</p>
                    <div className={styles.tags}>
                      {(content?.tags || []).map((tag, idx) => (
                        <span key={idx} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={
                        content.link ||
                        `/knowledge/${content.category}/${content.slug}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btn}
                    >
                      {t("knowledgeHub.readMoreButton", "Oxu")}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noResult}>
                {t("knowledgeHub.noResult", "Məzmun tapılmadı.")}
              </p>
            )}
          </div>

          {/* Pagination UI */}
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
                  <span key={i} className={styles.dots}>
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    className={currentPage === page ? styles.activePage : ""}
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
    </section>
  );
};

export default KnowledgeHub;
