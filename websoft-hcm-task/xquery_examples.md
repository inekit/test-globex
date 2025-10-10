# XQuery запросы для WebSoft HCM

## Основные запросы

### 1. Получение всех сотрудников

```xquery
for $emp in doc("collaborators")/collaborators/collaborator
return $emp/fullname
```

### 2. Получение сотрудников с сортировкой

```xquery
for $emp in doc("collaborators")/collaborators/collaborator
order by $emp/fullname
return $emp/fullname
```

### 3. Получение сотрудников с дополнительной информацией

```xquery
for $emp in doc("collaborators")/collaborators/collaborator
return <employee>
    <id>{$emp/@id}</id>
    <name>{$emp/fullname}</name>
    <department>{$emp/department}</department>
</employee>
```

### 4. Поиск сотрудников по имени

```xquery
for $emp in doc("collaborators")/collaborators/collaborator
where contains($emp/fullname, "Иванов")
return $emp/fullname
```

### 5. Подсчет количества сотрудников

```xquery
count(doc("collaborators")/collaborators/collaborator)
```

## Расширенные запросы

### 6. Группировка по отделам

```xquery
for $dept in distinct-values(doc("collaborators")/collaborators/collaborator/department)
return <department name="{$dept}">
    {
        for $emp in doc("collaborators")/collaborators/collaborator
        where $emp/department = $dept
        return <employee>{$emp/fullname}</employee>
    }
</department>
```

### 7. Сотрудники с определенным возрастом

```xquery
for $emp in doc("collaborators")/collaborators/collaborator
where $emp/age > 30 and $emp/age < 50
return <employee>
    <name>{$emp/fullname}</name>
    <age>{$emp/age}</age>
</employee>
```

### 8. Статистика по отделам

```xquery
for $dept in distinct-values(doc("collaborators")/collaborators/collaborator/department)
let $count := count(doc("collaborators")/collaborators/collaborator[department = $dept])
return <department name="{$dept}" count="{$count}"/>
```

## Примеры использования в HTML

### Простой список

```html
<% var employees = xquery(` for $emp in
doc("collaborators")/collaborators/collaborator order by $emp/fullname return
$emp/fullname `); %>

<ul>
  <% for (var i = 0; i < employees.length; i++) { %>
  <li><%= employees[i] %></li>
  <% } %>
</ul>
```

### С поиском

```html
<% var searchTerm = request.getParameter("search") || ""; var employees =
xquery(` for $emp in doc("collaborators")/collaborators/collaborator where
contains($emp/fullname, "${searchTerm}") order by $emp/fullname return
$emp/fullname `); %>
```

### С фильтрацией

```html
<% var department = request.getParameter("department") || ""; var employees =
xquery(` for $emp in doc("collaborators")/collaborators/collaborator where
$emp/department = "${department}" order by $emp/fullname return
<employee>
  <name>{$emp/fullname}</name>
  <position>{$emp/position}</position>
</employee>
`); %>
```

## Отладка запросов

### Проверка структуры документа

```xquery
doc("collaborators")
```

### Получение первого сотрудника

```xquery
doc("collaborators")/collaborators/collaborator[1]
```

### Проверка наличия поля

```xquery
exists(doc("collaborators")/collaborators/collaborator/fullname)
```

## Оптимизация производительности

### Использование индексов

```xquery
for $emp in doc("collaborators")/collaborators/collaborator[@id = "123"]
return $emp/fullname
```

### Ограничение результатов

```xquery
for $emp in doc("collaborators")/collaborators/collaborator[position() <= 10]
return $emp/fullname
```

### Кэширование результатов

```html
<% // Кэширование на уровне сессии if (!session.getAttribute("employeesCache"))
{ var employees = xquery(` for $emp in
doc("collaborators")/collaborators/collaborator order by $emp/fullname return
$emp/fullname `); session.setAttribute("employeesCache", employees); } var
cachedEmployees = session.getAttribute("employeesCache"); %>
```
