'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Home() {
  const [cards, setCards] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: cardsData } = await supabase.from('cards').select('*');
        const { data: postsData } = await supabase.from('posts').select('*');
        if (cardsData) setCards(cardsData);
        if (postsData) setPosts(postsData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#1e293b' }}>
      <header style={{ borderBottom: '2px solid #0284c7', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ color: '#0284c7', margin: 0 }}>☁️ 莱恩的云上国度</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>Ryan's Cloud Realm - 美国信用卡资讯与情报站</p>
      </header>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ borderLeft: '4px solid #0284c7', paddingLeft: '10px' }}>💳 热门信用卡列表</h2>
        {loading ? <p>正在连接 Supabase 云端数据库读取卡片...</p> : (
          <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
            {cards.map(card => (
              <div key={card.id} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{card.name} <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: '#475569' }}>{card.bank}</span></h3>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>年费：</strong> ${card.annual_fee}</p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#0284c7' }}><strong>🔥 开卡奖励：</strong> {card.sign_up_bonus}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ borderLeft: '4px solid #0284c7', paddingLeft: '10px' }}>📰 最新资讯与最强攻略</h2>
        <div style={{ marginTop: '15px' }}>
          {posts.map(post => (
            <div key={post.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', rounded: '4px', fontWeight: 'bold' }}>{post.category}</span>
              <h4 style={{ margin: '8px 0 5px 0', fontSize: '16px' }}>{post.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{post.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
