import { useState, useEffect } from "react";
import axios from "axios";

const Academics = () => {
	const [academics, setAcademics] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get("/api/academics")
			.then((res) => setAcademics(res.data))
			.catch((err) => console.error("Failed to fetch academics:", err))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div><h2>Academic History</h2><div className="spinner-container"><div className="spinner" /></div></div>;

	return (
		<div>
			<h2>Academic History</h2>

			<table className="bordered" style={{ width: "100%" }}>
				<thead>
					<tr>
						<th style={{ width: "140px" }}>Period</th>
						<th>Degree / Institution & Details</th>
					</tr>
				</thead>
				<tbody>
					{academics.map((item) => (
						<tr key={item.id}>
							<td className="table-period">{item.year}</td>
							<td>
								<div style={{ fontWeight: 600, fontSize: "1rem" }}>
									{item.institution}
								</div>
								<div style={{ color: "var(--primary-color)", fontWeight: 500, margin: "0.2rem 0" }}>
									{item.degree || item.class} ({item.level})
								</div>
								{item.thesis && (
									<div style={{ fontSize: "0.9rem", color: "#444", marginTop: "0.3rem" }}>
										<b>Thesis:</b> <em>"{item.thesis}"</em>
									</div>
								)}
								{item.advisor && (
									<div style={{ fontSize: "0.85rem", color: "#555", marginTop: "0.2rem" }}>
										<b>Advisor:</b> {item.advisor} {item.thesis_partner && `| Co-Researcher: ${item.thesis_partner}`}
									</div>
								)}
								{item.rank && (
									<div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.2rem" }}>
										<b>Honors:</b> {item.rank}
									</div>
								)}
								{item.coursework && (
									<div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.2rem" }}>
										<b>Key Coursework:</b> {item.coursework.join(", ")}
									</div>
								)}
								{item.location_place && (
									<div style={{ fontSize: "0.82rem", color: "#777", marginTop: "0.2rem" }}>
										📍 <a href={item.location_link} target="_blank" rel="noopener noreferrer">{item.location_place}</a>
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Academics;