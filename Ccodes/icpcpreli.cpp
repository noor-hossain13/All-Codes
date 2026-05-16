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
        vector<long long> init(n);
        for (int i = 0; i < n; ++i) cin >> init[i];

        struct Rule { long long x, y, z; };
        vector<Rule> rules;
        rules.reserve(m);
        for (int i = 0; i < m; ++i) {
            long long x, y, z;
            cin >> x >> y >> z;
            rules.push_back({x, y, z});
        }

        unordered_set<long long> present;
        present.reserve(n * 2 + m * 2);
        for (auto v : init) present.insert(v);

        bool changed = true;
        while (changed) {
            changed = false;
            for (const auto &r : rules) {
                if (present.find(r.z) != present.end()) continue;
                if (present.find(r.x) != present.end() && present.find(r.y) != present.end()) {
                    present.insert(r.z);
                    changed = true;
                }
            }
        }

        cout << present.size() << '\n';
    }

    return 0;
}