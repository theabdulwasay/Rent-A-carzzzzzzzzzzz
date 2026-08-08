export default function SearchPanel({ search, setSearch, categories, onSearch }) {
  return (
    <div className="search-panel">
      <div className="field">
        <label htmlFor="loc">Pickup location</label>
        <input
          id="loc"
          type="text"
          placeholder="City, airport, or address"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="pickup">Pickup date</label>
        <input
          id="pickup"
          type="date"
          value={search.pickupDate}
          onChange={(e) => setSearch({ ...search, pickupDate: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="dropoff">Return date</label>
        <input
          id="dropoff"
          type="date"
          value={search.dropoffDate}
          onChange={(e) => setSearch({ ...search, dropoffDate: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="cat">Vehicle type</label>
        <select
          id="cat"
          value={search.category}
          onChange={(e) => setSearch({ ...search, category: e.target.value })}
        >
          <option value="all">All types</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <button className="btn-primary" onClick={onSearch}>Find cars</button>
    </div>
  );
}
