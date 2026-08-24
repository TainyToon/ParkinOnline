CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TABLE parking_lots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    total_spaces INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parking_spaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parking_lot_id UUID NOT NULL,
    space_number VARCHAR(20) NOT NULL,
    type VARCHAR(30) NOT NULL DEFAULT 'NORMAL',
    status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_parking_lot
        FOREIGN KEY (parking_lot_id)
        REFERENCES parking_lots(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_space_number
        UNIQUE (parking_lot_id, space_number)
);

--Creating parkingLots

INSERT INTO parking_lots (name, address, total_spaces)
VALUES (
    'Parking Central',
    'San José, Costa Rica',
    10
);

INSERT INTO parking_lots (name, address, total_spaces)
VALUES (
    'Parking Central',
    'Cartago, Costa Rica',
    5
);

INSERT INTO parking_lots (name, address, total_spaces)
VALUES (
    'Parking Central',
    'Heredia, Costa Rica',
    5
);

--Information
Select * from parking_lots
Select * from parking_spaces

INSERT INTO parking_spaces (
    parking_lot_id,
    space_number,
    type,
    status
)
VALUES
(
    '0ba61f7e-b6b3-42b7-a5d0-54b990714fdb',
    'A01',
    'NORMAL',
    'AVAILABLE'
),


(
    '0ba61f7e-b6b3-42b7-a5d0-54b990714fdb',
    'A02',
    'NORMAL',
    'AVAILABLE'
),
(
    '0ba61f7e-b6b3-42b7-a5d0-54b990714fdb',
    'A03',
    'NORMAL',
    'AVAILABLE'
),
(

'0ba61f7e-b6b3-42b7-a5d0-54b990714fdb',
    'A04',
    'ACCESSIBLE',
    'AVAILABLE'
),
(

'0ba61f7e-b6b3-42b7-a5d0-54b990714fdb',
    'A05',
    'ACCESSIBLE',
    'AVAILABLE'
);
