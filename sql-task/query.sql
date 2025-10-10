-- T-SQL запрос для получения сотрудников всех нижестоящих подразделений
-- от подразделения сотрудника "Сотрудник 1" с id 710253
-- с возрастом менее 40 лет, исключая подразделения 100055 и 100059

WITH SubdivisionHierarchy AS (
    -- Рекурсивный CTE для построения иерархии подразделений
    SELECT 
        s.id,
        s.name,
        s.parent_id,
        0 as level,
        CAST(s.id AS VARCHAR(MAX)) as path
    FROM subdivisions s
    WHERE s.id = (
        -- Получаем subdivision_id сотрудника с id 710253
        SELECT subdivision_id 
        FROM collaborators 
        WHERE id = 710253
    )
    
    UNION ALL
    
    SELECT 
        s.id,
        s.name,
        s.parent_id,
        sh.level + 1,
        sh.path + ',' + CAST(s.id AS VARCHAR(MAX))
    FROM subdivisions s
    INNER JOIN SubdivisionHierarchy sh ON s.parent_id = sh.id
),

SubdivisionStats AS (
    -- Подсчет количества сотрудников в каждом подразделении
    SELECT 
        subdivision_id,
        COUNT(*) as colls_count
    FROM collaborators
    GROUP BY subdivision_id
)

-- Основной запрос
SELECT 
    c.id,
    c.name,
    s.name as sub_name,
    s.id as sub_id,
    sh.level as sub_level,
    COALESCE(ss.colls_count, 0) as colls_count
FROM collaborators c
INNER JOIN subdivisions s ON c.subdivision_id = s.id
INNER JOIN SubdivisionHierarchy sh ON s.id = sh.id
LEFT JOIN SubdivisionStats ss ON s.id = ss.subdivision_id
WHERE 
    c.age < 40  -- Возраст менее 40 лет
    AND s.id NOT IN (100055, 100059)  -- Исключаем подразделения 100055 и 100059
ORDER BY sh.level ASC, c.name ASC;  -- Сортировка по уровню вложенности и имени
