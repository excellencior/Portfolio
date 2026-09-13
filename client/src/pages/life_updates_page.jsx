import { useState, useEffect } from "react";
import axios from "axios";

const LifeUpdate = () => {
	const [lifeUpdates, setLifeUpdates] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get("/api/life-updates")
			.then((res) => setLifeUpdates(res.data))
			.catch((err) => console.error("Failed to fetch life updates:", err))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div><h2>My Updates</h2><div className="spinner-container"><div className="spinner" /></div></div>;

	return (
		<div>
			<h2>My Updates</h2>
			<p>
				A chronological record of research developments, career events, publications, and academic milestones:
			</p>

			<table className="bordered" style={{ width: "100%", marginTop: "1.5rem" }}>
				<thead>
					<tr>
						<th style={{ width: "130px" }}>Date</th>
						<th>Event / Milestone</th>
					</tr>
				</thead>
				<tbody>
					{lifeUpdates.map((item) => (
						<tr key={item.id}>
							<td className="table-period">
								{item.specific_date || item.date}
							</td>
							<td>
								<div style={{ fontWeight: 600, color: "var(--text-color)" }}>
									{item.title}
								</div>
								<div style={{ fontSize: "0.92rem", color: "#444", marginTop: "0.2rem" }}>
									{item.description}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default LifeUpdate;