-- Cria a tabela 'orders' caso ela ainda não exista
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,               -- Identificador único do pedido
    cliente TEXT NOT NULL,                              -- Nome do cliente (obrigatório)
    item TEXT NOT NULL,                                 -- Item do pedido (obrigatório)
    quantidade INTEGER NOT NULL CHECK (quantidade > 0), -- Quantidade deve ser maior que 0
    observacoes TEXT,                                   -- Campo opcional para observações
    status TEXT DEFAULT 'Em preparo'                    -- Status com valor padrão e restrição
        CHECK (status IN ('Em preparo', 'Pronto', 'Entregue')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP       -- Data/hora de criação do pedido
);
