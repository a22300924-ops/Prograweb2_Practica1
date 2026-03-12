# UML - Diagrama de Clases

```mermaid
classDiagram
    class Product {
        +number id
        +string name
        +number price
        +string description
        +string category
        +string imageUrl
        +boolean inStock
    }
    
    class ProductsService {
        +getAll() Observable~Product[]~
        -productosMock: Product[]
        -parseXml(xml: string) Product[]
        -getElementText(parent: Element, tagName: string) string | null
    }
    
    class CarritoService {
        +productos: Signal~Product[]~
        +agregar(producto: Product) void
        +quitar(id: number) void
        +vaciar() void
        +total() number
        +exportarXML() void
        -escapeXml(value: string) string
    }
    
    class SearchService {
        +searchTerm: Signal~string~
        +setSearchTerm(term: string) void
        +clearSearch() void
    }
    
    class CatalogoComponent {
        +products: Signal~Product[]~
        +filteredProducts: Computed~Product[]~
        +inStockCount: Computed~number~
        +agregar(producto: Product) void
    }
    
    class CarritoComponent {
        +carrito: Signal~Product[]~
        +total: Computed~number~
        +quitar(id: number) void
        +vaciar() void
        +exportarXML() void
    }
    
    class NavbarComponent {
        +searchTerm: Signal~string~
        +products: Signal~Product[]~
        +showResults: Signal~boolean~
        +cartCount: Computed~number~
        +filteredProducts: Computed~Product[]~
        +onSearchInput(event: Event) void
        +onSearchFocus() void
        +onSearchBlur() void
        +selectProduct(product: Product) void
    }
    
    class ProductCardComponent {
        +product: Product
        +add: EventEmitter~Product~
        +onAdd() void
    }
    
    class App {
        +title: Signal~string~
    }
    
    ProductsService ..> Product : usa
    CarritoService ..> Product : usa
    CatalogoComponent --> ProductsService
    CatalogoComponent --> CarritoService
    CatalogoComponent --> SearchService
    CatalogoComponent --> ProductCardComponent
    CarritoComponent --> CarritoService
    NavbarComponent --> CarritoService
    NavbarComponent --> ProductsService
    NavbarComponent --> SearchService
    ProductCardComponent --> Product
    App --> NavbarComponent
    App --> CatalogoComponent
    App --> CarritoComponent
```

---

## UML - Diagrama de Componentes

```mermaid
flowchart TB
    subgraph "Componentes Angular"
        App["App Component"]
        Navbar["Navbar Component"]
        Catalogo["Catalogo Component"]
        Carrito["Carrito Component"]
        ProductCard["Product Card"]
    end
    
    subgraph "Servicios"
        ProductsService["Products Service"]
        CarritoService["Carrito Service"]
        SearchService["Search Service"]
    end
    
    subgraph "Modelos"
        Product["Product"]
    end
    
    subgraph "Datos Externos"
        XML["productos.xml"]
    end
    
    App --> Navbar
    App --> Catalogo
    App --> Carrito
    
    Navbar --> SearchService
    Navbar --> CarritoService
    Navbar --> ProductsService
    
    Catalogo --> ProductsService
    Catalogo --> CarritoService
    Catalogo --> SearchService
    Catalogo --> ProductCard
    
    Carrito --> CarritoService
    
    ProductCard --> Product
    
    ProductsService --> XML
    ProductsService --> Product
```

---

## UML - Diagrama de Secuencia (Agregar al Carrito)

```mermaid
sequenceDiagram
    participant U as Usuario
    participant PC as ProductCard
    participant CC as CatalogoComponent
    --> CS as CarritoService
    participant N as Navbar
    
    U->>PC: Click "Agregar"
    PC->>CC: add.emit(product)
    CC->>CS: agregar(producto)
    CS->>CS: productosSignal.update()
    CS-->>CC: Signal actualizado
    CS-->>N: Signal actualizado
    N-->>U: Contador carrito se actualiza
```

---

## UML - Diagrama de Secuencia (Carga de Productos)

```mermaid
sequenceDiagram
    participant C as CatalogoComponent
    participant PS as ProductsService
    participant HTTP as HttpClient
    participant XML as productos.xml
    
    C->>PS: getAll()
    PS->>HTTP: HTTP GET /productos.xml
    HTTP-->>PS: XML response
    
    alt Éxito XML
        PS->>PS: parseXml()
        PS-->>C: Observable<Product[]>
    else Error/Fallback
        PS->>PS: productosMock
        PS-->>C: Observable<Product[]>
    end
    
    C->>C: products.set(data)
```
