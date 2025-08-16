import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Načtení nastavení podle device-id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('deviceId');

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID je povinný' }, { status: 400 });
    }

    let db: any;
    try {
      ({ default: db } = await import('@/lib/database'));
    } catch (e) {
      console.error('DB_INIT_ERROR loading better-sqlite3/database module', e);
      return NextResponse.json(
        { error: 'Database module failed to load', code: 'DB_INIT_ERROR' },
        { status: 500 }
      );
    }

    const stmt = db.prepare('SELECT settings FROM user_settings WHERE device_id = ?');
    const result = stmt.get(deviceId) as { settings: string } | undefined;

    if (result) {
      return NextResponse.json({
        success: true,
        settings: JSON.parse(result.settings)
      });
    } else {
      return NextResponse.json({
        success: true,
        settings: null
      });
    }
  } catch (error) {
    console.error('Chyba při načítání nastavení:', error);
    return NextResponse.json(
      { error: 'Chyba serveru při načítání nastavení' },
      { status: 500 }
    );
  }
}

// POST - Uložení nastavení podle device-id
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { deviceId, settings } = body;

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID je povinný' }, { status: 400 });
    }

    if (!settings) {
      return NextResponse.json({ error: 'Nastavení jsou povinná' }, { status: 400 });
    }

    let db: any;
    try {
      ({ default: db } = await import('@/lib/database'));
    } catch (e) {
      console.error('DB_INIT_ERROR loading better-sqlite3/database module', e);
      return NextResponse.json(
        { error: 'Database module failed to load', code: 'DB_INIT_ERROR' },
        { status: 500 }
      );
    }
    const settingsJson = JSON.stringify(settings);
    
    // Zkusíme aktualizovat existující záznam
    const updateStmt = db.prepare(`
      UPDATE user_settings 
      SET settings = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE device_id = ?
    `);
    
    const updateResult = updateStmt.run(settingsJson, deviceId);
    
    // Pokud se neaktualizoval žádný záznam, vytvoříme nový
    if (updateResult.changes === 0) {
      const insertStmt = db.prepare(`
        INSERT INTO user_settings (device_id, settings) 
        VALUES (?, ?)
      `);
      
      insertStmt.run(deviceId, settingsJson);
    }

    return NextResponse.json({
      success: true,
      message: 'Nastavení byla úspěšně uložena'
    });
  } catch (error) {
    console.error('Chyba při ukládání nastavení:', error);
    return NextResponse.json(
      { error: 'Chyba serveru při ukládání nastavení' },
      { status: 500 }
    );
  }
}
