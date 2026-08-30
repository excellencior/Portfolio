import academics from "../consts/academics/academics";

const Academics = () => {
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
										<b>Advisor:</b> {item.advisor} {item.thesisPartner && `| Co-Researcher: ${item.thesisPartner}`}
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
								{item.location && (
									<div style={{ fontSize: "0.82rem", color: "#777", marginTop: "0.2rem" }}>
										📍 <a href={item.location.link} target="_blank" rel="noopener noreferrer">{item.location.place}</a>
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