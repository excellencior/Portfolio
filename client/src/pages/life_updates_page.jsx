import life_updates from "../consts/bio/life_updates";

const LifeUpdate = () => {
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
					{life_updates.map((item) => (
						<tr key={item.id}>
							<td className="table-period">
								{item.specificDate || item.date}
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