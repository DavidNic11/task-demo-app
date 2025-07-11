create or replace function get_top_performer()
returns table(full_name text, completed_count bigint)
security definer
as $$
begin
  return query
    select p.full_name, count(t.id) as task_count
    from tasks t
    join profiles p on t.assignee_id = p.id
    where t.status = 'done'
    group by p.id, p.full_name
    order by task_count desc
    limit 1;
end;
$$ language plpgsql;
