#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    if (!(cin >> t)) return 0;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<long long> initial(n);
        for (int i = 0; i < n; ++i) cin >> initial[i];

        struct Rule { long long x, y, z; };
        vector<Rule> rules(m);
        for (int i = 0; i < m; ++i) cin >> rules[i].x >> rules[i].y >> rules[i].z;

        // present: chemicals currently known to be in the chamber
        unordered_set<long long> present;
        present.reserve(n * 2 + m);
        queue<long long> q;

        // map each chemical value -> list of rule indices that mention it
        unordered_map<long long, vector<int>> occurs;
        occurs.reserve(m * 2 + n);
        for (int i = 0; i < m; ++i) {
            occurs[rules[i].x].push_back(i);
            occurs[rules[i].y].push_back(i);
        }

        // initialize
        for (auto v : initial) {
            if (present.insert(v).second) q.push(v);
        }

        // process newly discovered chemicals; whenever both reactants of a rule are present,
        // we add the produced chemical z (if not already present) and push it to queue.
        while (!q.empty()) {
            long long u = q.front(); q.pop();
            auto it = occurs.find(u);
            if (it == occurs.end()) continue;
            for (int idx : it->second) {
                long long x = rules[idx].x, y = rules[idx].y, z = rules[idx].z;
                if (present.find(z) != present.end()) continue; // already have z
                if (present.find(x) != present.end() && present.find(y) != present.end()) {
                    present.insert(z);
                    q.push(z);
                }
            }
        }

        cout << present.size() << '\n';
    }

    return 0;
}
